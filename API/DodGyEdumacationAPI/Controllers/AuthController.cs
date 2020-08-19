using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DodGyEdumacationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static DodGyEdumacationAPI.Startup;

namespace DodGyEdumacationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DODGYEDUMACATIONContext _context;

        public AuthController(DODGYEDUMACATIONContext context)
        {
            _context = context;
        }


        // GET api/values
        [HttpGet, Route("login")]
        public IActionResult Login(Login login)
        {
            if (login == null)
            {
                return BadRequest("Invalid client request");
            }

            var passwordHash = SHA512.Create();
            passwordHash.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            var user = (from u in _context.User
                        where u.Userid == login.UserId && u.Password == passwordHash.Hash
                        select new User{ Userid = u.Userid});

            if (user.Count() != 0)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.GetSection("AppSettings").GetSection("Secret").Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5001",
                    audience: "http://localhost:5001",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddDays(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                user = (from u in _context.User
                            where u.Userid == login.UserId
                            select new User
                            { Userid = u.Userid, UserType = u.UserType, FirstName = u.FirstName, LastName = u.LastName, Token = tokenString });

                return Ok(user);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
