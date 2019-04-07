using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VueMVC.Areas.Test.Controllers
{
    public class HomeController : Controller
    {
        // GET: Test/Home
        public ActionResult Index()
        {
            var msg = new Message()
            {
                MessageBody = "Hello"
            };

            return View(msg);
        }

        public ActionResult Show()
        {
            var msg = new Message()
            {
                MessageBody = "Hello"
            };

            return View(msg);
        }
    }
}