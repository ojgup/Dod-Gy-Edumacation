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
        // Returns Session if found, otherwise nothing
        [HttpGet("open/{userId}"), Authorize]
        public async Task<ActionResult<IEnumerable<Session>>> GetOpenSession(string userId)
        {
            var session =  await _context.Session.Where(s => s.UserId == userId && s.SessionEnd ==
            null && s.SessionStart.DayOfYear == DateTime.Now.DayOfYear).SingleOrDefaultAsync();

            if (session != null)
                return Ok(session);
            else
                return NotFound("No open sessions found");
        }

        // GET: api/DGE/user/{userId}
        // Return User if found, otherwise nothing
        [HttpGet("user/{userId}"), Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUser(string userId)
        {
            var re = Request;
            var headers = re.Headers;
            foreach (var head in headers)
            {
                Console.WriteLine(head);
            }

            var user = await _context.User.Where(u => u.Userid == userId).Select(u =>
            new User
            {
                Userid = u.Userid,
                FirstName = u.FirstName,
                LastName = u.LastName,
                UserType = u.UserType
            }
            ).SingleOrDefaultAsync();

            if (user != null)
                return Ok(user);
            else
                return NotFound("User not found");
        }

        // GET: api/DGE/report
        //Returns Reports if found, otherwise NotFoundObjectResult
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
                return NotFound("No reports found");
        }

        // POST: api/DGE/start
        //Returns an OK result if insert Session successful 
        [HttpPost("start"), Authorize]
        public async Task<IActionResult> SessionStart(Session session)
        {
            Console.WriteLine("PostMethod Called");

            try
            {
                Session record = FindOpenSession(session);

                if (record == null)
                {
                    _context.Session.Add(session);
                    await _context.SaveChangesAsync();

                    Console.WriteLine("Sesson Started");
                    return Ok();
                }
                else
                    return NotFound("Could not find an open session in the database with the information sent.");

            }
            catch (SqlException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/DGE/end
        //Returns an Ok IActionResult if record is successfully updated, other requests if not
        [HttpPut("end"), Authorize]
        public async Task<IActionResult> SessionEnd(Session session)
        {
            try
            {
                Session record = FindOpenSession(session);

                if (record != null)
                {
                    record.SessionEnd = session.SessionEnd;

                    await _context.SaveChangesAsync();

                    return Ok();
                }
                else
                    return NotFound("Could not find an open session in the database with the information sent.");

            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (CheckEndDate(session.SessionId))
                {
                    return BadRequest("The current record has already been updated");
                }
                else
                    return BadRequest(ex.Message);
            }
        }

        //Checks Session in database and returns an open Session
        private Session FindOpenSession(Session session)
        {
            Session record = (from s in _context.Session where s.SessionId == session.SessionId && s.SessionEnd == null && s.SessionStart.DayOfYear == DateTime.Now.DayOfYear select s).SingleOrDefault();
            return record;
        }

        //Checks Session record and returns true if sessionEnd value has been updated, false if it has not
        private bool CheckEndDate(int sessionId)
        {
            return _context.Session.Any(s => s.SessionId == sessionId && s.SessionEnd != null);
        }

    }
}
