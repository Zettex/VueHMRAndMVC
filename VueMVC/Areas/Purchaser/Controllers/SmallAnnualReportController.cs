using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VueMVC.Areas.Purchaser.Controllers
{
    public class SmallAnnualReportController : Controller
    {
        // GET: Purchaser/SmallAnnualReport
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Details()
        {
            ViewBag.RandomNum = new Random().Next(0, 100);
            return View();
        }
    }
}