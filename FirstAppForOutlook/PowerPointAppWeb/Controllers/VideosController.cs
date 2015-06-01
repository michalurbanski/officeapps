using PowerPointAppWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PowerPointAppWeb.Controllers
{
    public class VideosController : ApiController
    {
        public IEnumerable<Video> Get()
        {
            return new List<Video>()
            {
                new Video{VideoId="9Cyokaj3BJU", Title="Sweet Home Alabama"},
                new Video{VideoId="sENM2wA_FTg", Title="It's Time"},
            };
        }
    }
}
