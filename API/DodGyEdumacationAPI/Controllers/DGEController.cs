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

    }
}
