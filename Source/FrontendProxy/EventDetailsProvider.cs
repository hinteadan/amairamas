using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using H.Crawly.Common;
using HttpDataStore.Client;

namespace FrontendProxy
{
    public class EventDetailsProvider : IPopulateCrawlyTemplate
    {
        private Guid eventId;

        public IPopulateCrawlyTemplate For(NameValueCollection queryString)
        {
            if (string.IsNullOrWhiteSpace(queryString["e"]))
            {
                throw new InvalidOperationException("Event Id not sent");
            }
            this.eventId = Guid.Parse(queryString["e"]);
            return this;
        }

        public Dictionary<string, string> WithThese()
        {
            var eventInfo = new Store<EventInfo>(
                ConfigurationManager.AppSettings["DataStore.DbName"],
                ConfigurationManager.AppSettings["DataStore.Url"])
                .Load(eventId)
                .Data;
            return new Dictionary<string, string> { 
                { "title", eventInfo.title },
                { "description", eventInfo.description },
                { "wallUrl", eventInfo.wallUrl },
                { "endsOn", eventInfo.endsOn.ToString() }
            };
        }
    }

    public class EventInfo
    {
        public string title { get; set; }
        public string description { get; set; }
        public string wallUrl { get; set; }
        public DateTime endsOn { get; set; }
    }
}