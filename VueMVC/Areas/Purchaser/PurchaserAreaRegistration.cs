using System.Web.Mvc;

namespace VueMVC.Areas.Purchaser
{
    public class PurchaserAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Purchaser";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Purchaser_default",
                "Purchaser/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}