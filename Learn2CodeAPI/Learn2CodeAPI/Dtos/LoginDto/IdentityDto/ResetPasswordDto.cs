﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Learn2CodeAPI.Dtos.LoginDto.IdentityDto
{
    public class ResetPasswordDto
    {
       
        public string Password { get; set; }
        
       
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
