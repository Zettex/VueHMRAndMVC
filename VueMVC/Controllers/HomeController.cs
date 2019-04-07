using System;
using System.Web.Mvc;

namespace VueMVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var msg = new Message()
            {
                MessageBody = "Hello"
            };

            return View(msg);
        }
    }
}