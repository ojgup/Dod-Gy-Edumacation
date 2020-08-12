using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DodGyEdumacationAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;

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

        // GET: api/DGE/user/{userId}
        // Returns User object if found, otherwise nothing
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUser(string userId)
        {
            return await _context.User.Where(u => u.Userid == userId).ToListAsync();
        }

        // GET: api/DGE/active/{userId}
        // Returns Session if found, otherwise nothing
        [HttpGet("open/{userId}")]
        public async Task<ActionResult<IEnumerable<Session>>> GetOpenSession(string userId)
        {
            return await _context.Session.Where(s => s.UserId == userId && s.SessionEnd == null).ToListAsync();
        }

        // GET: api/DGE/report
        // 
        [HttpGet("report")]
        public async Task<List<Report>> GetReport(string userId, DateTime start, DateTime end)
        {
            //Validation for user - should it retrieve the original user AND the requested userId
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

                var sql = "EXEC @REPORT = GET_REPORT @SESSIONSTART, @SESSIONEND, @ROOMCODE, @SESSIONID";

                List<Report> report = await _context.Report.FromSqlRaw(sql, sessionStart, sessionEnd, roomCode, sessionId).ToListAsync();

                reports.Add(new Report { DateTimeEntered = report[0].DateTimeEntered, DateTimeLeft = report[0].DateTimeLeft, 
                    Room = report[0].Room, SessionType = report[0].SessionType, Teacher = report[0].Teacher});
            }

            Console.WriteLine(reports);

            return reports;
        }

        /*public string GetTeacher()
        {
            return 
        }*/

        // POST: api/DGE/start
        //Returns incremented sessionID from DB if INSERT accepted, otherwise error and returns -1
        [HttpPost("start")]
        public async Task<int> SessionStart(Session session)
        {
            if (!await _context.Session.AnyAsync(s => s.UserId == session.UserId && s.SessionEnd == null))
            {
                var sessionId = new SqlParameter
                {
                    ParameterName = "@SESSIONID",
                    DbType = System.Data.DbType.Int32,
                    Direction = System.Data.ParameterDirection.Output
                };

                SqlParameter roomCode = new SqlParameter("@ROOMCODE", session.RoomCode);
                SqlParameter sessionStart = new SqlParameter("@SESSIONSTART", session.SessionStart.ToString("yyyy-MM-dd HH:mm:ss.fff"));
                SqlParameter sessionType = new SqlParameter("@SESSIONTYPE", session.SessionType);
                SqlParameter userId = new SqlParameter("@USERID", session.UserId);

                var sql = "EXEC @SESSIONID = START_SESSION @ROOMCODE, @SESSIONSTART, @SESSIONTYPE, @USERID";

                await _context.Database.ExecuteSqlRawAsync(sql, sessionId, roomCode, sessionStart, sessionType, userId);

                return Convert.ToInt32(sessionId.Value);
            }
            else
                return -1;
        }

        // PUT: api/DGE/end
        //Returns an Ok IActionResult if record is successfully updated, other requests if not
        [HttpPut("end")]
        public async Task<IActionResult> SessionEnd(Session session)
        {
            try
            {
                Session record = (from s in _context.Session where s.SessionId == session.SessionId && s.SessionEnd == null select s).SingleOrDefault();

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

        //Checks Session record and returns true if sessionEnd value has been updated, false if it has not
        private bool CheckEndDate(int sessionId)
        {
            return _context.Session.Any(s => s.SessionId == sessionId && s.SessionEnd != null);
        }

    }
}
