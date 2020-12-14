using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace api
{
    public static class GetDeaconCalendarFunc
    {
        [FunctionName("GetDeaconCalendarFunc")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var deaconCalendarList = new List<DeaconCalendar>
            {
                new DeaconCalendar
                {
                    id = 1,
                    month = 1,
                    year = 2021,
                    deacon = new Deacon {email = "", id = 5, name = "John Stolnis", phone = "7035551212"}
                },
                new DeaconCalendar
                {
                    id = 2,
                    month = 2,
                    year = 2021,
                    deacon = new Deacon {email = "", id = 4, name = "Rob Jinks", phone = "7035551212"}
                },
                new DeaconCalendar
                {
                    id = 3,
                    month = 3,
                    year = 2021,
                    deacon = new Deacon {email = "", id = 3, name = "Van Van Lowe", phone = "7035551212"}
                },
                new DeaconCalendar
                {
                    id = 4,
                    month = 4,
                    year = 2021,
                    deacon = new Deacon {email = "", id = 2, name = "Jim Niece", phone = "7035551212"}
                },
                new DeaconCalendar
                {
                    id = 5,
                    month = 5,
                    year = 2021,
                    deacon = new Deacon {email = "", id = 5, name = "John Stolnis", phone = "7035551212"}
                },
                new DeaconCalendar
                {
                    id = 6,
                    month = 6,
                    year = 2021,
                    deacon = new Deacon {email = "", id = 4, name = "Rob Jinks", phone = "7035551212"}
                }
            };

            //string name = req.Query["name"];

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //dynamic data = JsonConvert.DeserializeObject(requestBody);
            //name = name ?? data?.name;

            //string responseMessage = string.IsNullOrEmpty(name)
            //    ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
            //    : $"Hello, {name}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(deaconCalendarList);
        }
    }

    public class Deacon 
    {
        public long id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }

    public class DeaconCalendar
    {
        public long id { get; set; }
        public int year { get; set; }
        public int month { get; set; }
        public Deacon deacon { get; set; }
    }
}
