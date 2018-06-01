using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Excel = NetOffice.ExcelApi;

namespace OfficeScript.Report
{
    public class ExcelTags
    {
        private dynamic element;

        public ExcelTags(Excel.Workbook workbook)
        {
            this.element = workbook;
        }

        public ExcelTags(Excel.Worksheet worksheet)
        {
            this.element = worksheet;
        }

        public ExcelTags(Excel.Range range)
        {
            this.element = range;
        }

        /// <summary>
        /// Retuns an object with async functions for node.js
        /// </summary>
        /// <returns></returns>
        public object Invoke()
        {
            return new
           {
                get = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.Get((string)input);
                    }),
                set = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        this.Set((input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value));
                        return this.Invoke();
                    }),
                remove = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        this.Delete((string)input);
                        return this.Invoke();
                    }),
                all = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.GetAll();
                    })
           };
        }

        public string Get(string name)
        {
            return this.element.Tags[name];
        }

        public Dictionary<string, string> GetAll()
        {
            var tags = new Dictionary<string, string>();
            for (int i = 1; i <= this.element.Tags.Count; i++)
            {
                tags.Add(this.element.Tags.Name(i), this.element.Tags.Value(i));
            }
            return tags;
        }

        public void Set(Dictionary<string, object> parameters)
        {
            this.Set((string)parameters["name"], (string)parameters["value"]);
        }

        public void Set(string name, object value)
        {
            this.Delete(name); //Used tags need to be deleted befor set new
            this.element.Tags.Add(name, value.ToString());
        }

        public void Delete(string name)
        {
            this.element.Tags.Delete(name);
        }

        //public void Clone(PowerPointTags dest)
        //{
        //    for (int i = 1; i <= this.element.Tags.Count; i++)
        //    {
        //        dest.Set(this.element.Tags.Name(i), this.element.Tags.Value(i));
        //    }
        //}
    }
}
