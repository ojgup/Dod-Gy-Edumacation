using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DodGyEdumacationAPI.Models;
using Microsoft.Data.SqlClient;

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
        // Returns true if userId found, false otherwise 
        [HttpGet("user/{userId}")]
        public async Task<bool> GetUser(string userId)
        {
            return await _context.User.AnyAsync(u => u.Userid == userId);
        }


        // POST: api/DGE
        //Returns 1 if INSERT accepted, 0 if not
        [HttpPost("start")]
        public async Task<IActionResult> SessionStart(Session session)
        {
            SqlParameter roomCode = new SqlParameter("@ROOMCODE", session.RoomCode);
            SqlParameter sessionStart = new SqlParameter("@SESSIONSTART", session.SessionStart);
            SqlParameter sessionType = new SqlParameter("@SESSIONTYPE", session.SessionType);
            SqlParameter userId = new SqlParameter("@USERID", session.UserId);

            var sql = "EXEC START_SESSION @ROOMCODE, @SESSIONSTART, @SESSIONTYPE, @USERID";

            int result = await _context.Database.ExecuteSqlRawAsync(sql, roomCode, sessionStart, sessionType, userId);

            if (result == 1)
                return Ok();
            else
                return BadRequest();
        }

    }
}
