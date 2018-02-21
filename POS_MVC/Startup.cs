using Microsoft.Owin;
using Microsoft.Owin.Builder;
using Owin;

[assembly: OwinStartupAttribute(typeof(POS_MVC.Startup))]
namespace POS_MVC
{
    public partial class Startup
    {
        public void Configuration(AppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
