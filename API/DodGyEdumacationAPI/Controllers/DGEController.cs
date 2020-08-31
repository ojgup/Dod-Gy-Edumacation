using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DodGyEdumacationAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace DodGyEdumacationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DGEController : ControllerBase
    {
        private readonly DODGYEDUMACATIONContext _context;

        public DGEController(DODGYEDUMACATIONContext context)
        {
            _context = context;
        }

        // GET: api/DGE/active/{userId}
        // Returns Session if found, otherwise NoContent() HttpResponse
        [HttpGet("open/{userId}"), Authorize]
        public async Task<ActionResult<IEnumerable<Session>>> GetOpenSession(string userId, int offset)
        {
            if (offset > 720 || offset < -720)
            {
                return BadRequest(new { message = "Invalid offset." });
            }

            var session =  await _context.Session.Where(s => s.UserId == userId && s.SessionEnd ==
            null && s.SessionStart.AddMinutes(offset).DayOfYear == DateTime.Now.DayOfYear).FirstOrDefaultAsync();

            if (session != null)
                return Ok(session);
            else
                return NoContent();
        }

        // GET: api/DGE/user/{userId}
        // Return User if found, otherwise NoContent() HttpResponse
        [HttpGet("user/{userId}"), Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUser(string userId)
        {

            var user = await _context.User.Where(u => u.Userid == userId).Select(u =>
            new User
            {
                Userid = u.Userid,
                FirstName = u.FirstName,
                LastName = u.LastName,
                UserType = u.UserType
            }
            ).FirstOrDefaultAsync();

            if (user != null)
                return Ok(user);
            else
                return NoContent();
        }

        // GET: api/DGE/report
        //Returns Reports if found, otherwise NoContent() HttpResponse
        [HttpGet("report"), Authorize]
        public async Task<ActionResult<IEnumerable<Report>>> GetReport(string userId, DateTime start, DateTime end)
        {
            List<Session> sessions = await _context.Session.Where(r => r.UserId == userId && r.SessionStart >= start && r.SessionEnd <= end).ToListAsync();
            List<Report> reports = new List<Report>();

            SqlParameter sessionStart;
            SqlParameter sessionEnd;
            SqlParameter roomCode;
            SqlParameter sessionId;

            foreach (Session session in sessions)
            {
                sessionStart = new SqlParameter("@SESSIONSTART", session.SessionStart);
                sessionEnd = new SqlParameter("@SESSIONEND", session.SessionEnd);
                roomCode = new SqlParameter("@ROOMCODE", session.RoomCode);
                sessionId = new SqlParameter("@SESSIONID", session.SessionId);

                var sql = "EXEC GET_REPORT @SESSIONSTART, @SESSIONEND, @ROOMCODE, @SESSIONID";

                List<Report> report = await _context.Report.FromSqlRaw(sql, sessionStart, sessionEnd, roomCode, sessionId).ToListAsync();

                reports.Add(new Report
                {
                    SessionStart = report[0].SessionStart,
                    SessionEnd = report[0].SessionEnd,
                    RoomCode = report[0].RoomCode,
                    SessionType = report[0].SessionType,
                    Teacher = report[0].Teacher
                });
            }

            if (reports.Count() != 0)
                return Ok(reports);
            else
                return NoContent();
        }

        // POST: api/DGE/start
        //Returns an Ok response if insert Session successful, BadRequest response if body data improper, InternalServerError response if SQLException 
        [HttpPost("start"), Authorize]
        public async Task<IActionResult> SessionStart(Session session, int offset)
        {
            try
            {
                Session record = FindOpenSession(session, offset);

                if (record == null)
                {
                    _context.Session.Add(session);
                    await _context.SaveChangesAsync();

                    return Ok();
                }
                else
                    return BadRequest(new { message = "Session already exists." });

            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        // PUT: api/DGE/end
        //Returns an Ok response if Session successfully closed, BadRequest response if body data improper, InternalServerError response if DBUpdateConcurrencyException 
        [HttpPut("end"), Authorize]
        public async Task<IActionResult> SessionEnd(Session session, int offset)
        {
            try
            {
                Session record = FindOpenSession(session, offset);

                if (record != null)
                {
                    record.SessionEnd = session.SessionEnd;

                    await _context.SaveChangesAsync();

                    return Ok();
                }
                else
                    return BadRequest(new { message = "Session does not exist." });

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while updating the entries." });
                }
        }

        //Checks Session in database and returns an open Session
        private Session FindOpenSession(Session session, int offset)
        {
            return (from s in _context.Session where s.UserId == session.UserId && s.SessionEnd == null && s.SessionStart.AddMinutes(offset).DayOfYear == DateTime.Now.DayOfYear select s).FirstOrDefault();
        }

    }
}
