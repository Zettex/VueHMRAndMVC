using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VueMVC
{
    public class Message
    {
        public string MessageBody { get; set; }

        public int Length { get => MessageBody.Length; }
    }
}