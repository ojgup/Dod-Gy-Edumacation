using System;
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

        // GET api/auth/login
        // Accepts a Login object - parameters userId (string) and password (string). If the model values match a user login in the database it
        // returns a JWT, otherwise Unauthorized result
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
                var userId = user.Select(u => u.Userid).ToList();
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.GetSection("AppSettings").GetSection("Secret").Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new[] { 
                    new Claim("userId", userId[0].ToString()) 
                };

                var tokenOptions = new JwtSecurityToken(
                    issuer: Config.GetSection("AppSettings").GetSection("Url").Value,
                    audience: Config.GetSection("AppSettings").GetSection("Url").Value,
                    claims: claims,
                    expires: DateTime.Now.AddDays(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new { Token = tokenString});
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
