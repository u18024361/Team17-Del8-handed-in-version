﻿using Learn2CodeAPI.Dtos.GenericDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Learn2CodeAPI.Dtos.AdminDto
{
    public class UniversityDto : BaseDto
    {
        public UniversityDto() { }
        public string UniversityName { get; set; }
    }
}
