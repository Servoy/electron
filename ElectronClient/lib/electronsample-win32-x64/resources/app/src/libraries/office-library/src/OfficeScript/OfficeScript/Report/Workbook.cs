using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Excel = NetOffice.ExcelApi;
using NetOffice.OfficeApi.Enums;
using System.Globalization;

namespace OfficeScript.Report
{
    public class Workbook : IDisposable
    {
        private bool disposed;
        private Excel.Workbook workbook;
        private Excel.Application application;
        private const OfficeScriptType officeScriptType = OfficeScriptType.Document;
        private bool closeDocument = true;
        private ExcelTags tags;
        private DocumentProperty properties;
        public Workbook(Excel.Workbook workbook)
        {
            this.workbook = workbook;
            this.tags = new ExcelTags(this.workbook);
            this.properties = new DocumentProperty(this.workbook);
        }

        // Destruktor
        ~Workbook()
        {
            Dispose(false);
        }

        #region Dispose

        // Implement IDisposable.
        // Do not make this method virtual.
        // A derived class should not be able to override this method.
        public void Dispose()
        {
            Dispose(true);
            // This object will be cleaned up by the Dispose method.
            // Therefore, you should call GC.SupressFinalize to
            // take this object off the finalization queue
            // and prevent finalization code for this object
            // from executing a second time.
            GC.SuppressFinalize(this);
        }
        // Dispose(bool disposing) executes in two distinct scenarios.
        // If disposing equals true, the method has been called directly
        // or indirectly by a user's code. Managed and unmanaged resources
        // can be disposed.
        // If disposing equals false, the method has been called by the
        // runtime from inside the finalizer and you should not reference
        // other objects. Only unmanaged resources can be disposed.
        protected virtual void Dispose(bool disposing)
        {
            // Check to see if Dispose has already been called.
            if (!this.disposed)
            {
                // If disposing equals true, dispose all managed
                // and unmanaged resources.
                if (disposing)
                {
                    if (this.closeDocument)
                    {
                        this.workbook.Saved = true;
                        this.workbook.Close();
                    }
                    this.workbook.Dispose();

                }

                // Note disposing has been done.
                this.disposed = true;
            }
        }
        #endregion Dispose

        /// <summary>
        /// Retuns an object with async functions for node.js
        /// </summary>
        /// <returns></returns>
        public object Invoke()
        {
            return new
            {
                attr = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        if (input is string)
                        {
                            var tmp = new Dictionary<string, object>();
                            tmp.Add("name", input);
                            input = tmp;
                        }
                        return Util.Attr(this, (input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value), Invoke);
                    }),
                tags = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.tags.Invoke();
                    }),
                properties = (Func<object, Task<object>>)(
                async (input) =>
                {
                    return this.properties.Invoke();
                }),
                save = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        this.Save();
                        return null;
                    }
                ),
                saveAs = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        if (input is string)
                        {
                            var tmp = new Dictionary<string, object>();
                            tmp.Add("name", input);
                            input = tmp;
                        }
                        this.SaveAs((input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value));
                        return null;
                    }
                ),
                saveAsCopy = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        if (input is string)
                        {
                            var tmp = new Dictionary<string, object>();
                            tmp.Add("name", input);
                            input = tmp;
                        }
                        this.SaveAsCopy((input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value));
                        return null;
                    }
                ),
                close = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        this.Dispose();
                        return null;
                    }
                ),
                workbooks = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        input = (input == null) ? new Dictionary<string, object>() : input;
                        return this.Workbooks((input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value));
                    }
                ),
                textReplace = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        this.TextReplace((input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value));
                        return this.Invoke();
                    }
                ),
                dispose = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        this.workbook.Dispose();
                        return null;
                    }),
                getType = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return officeScriptType;
                    }
                )
            };
        }


        #region Save
        private void Save()
        {
            this.workbook.Save();
        }

        private void SaveAs(IDictionary<string, object> parameters)
        {
            string name = (string)(parameters as IDictionary<string, object>)["name"];
            string type = "xls";
            object tmp;
            if (parameters.TryGetValue("type", out tmp))
            {
                type = (string)tmp;
            }
            this.SaveAs(name, type);
        }


        private void SaveAs(string fileName, string fileType)
        {
            this.SaveAs(fileName, fileType, false);
        }

        private void SaveAsCopy(IDictionary<string, object> parameters)
        {
            string name = (string)(parameters as IDictionary<string, object>)["name"];
            string type = "docx";
            object tmp;
            if (parameters.TryGetValue("type", out tmp))
            {
                type = (string)tmp;
            }
            this.SaveAs(name, type, true);
        }

        private void SaveAsCopy(string fileName, string fileType)
        {
            this.SaveAs(fileName, fileType, true);
        }

        private void SaveAs(string fileName, string fileType, bool isCopy)
        {
            Excel.Enums.XlFileFormat XlFileType;

            switch (fileType.ToLower())
            {
                case "xls":
                    XlFileType = Excel.Enums.XlFileFormat.xlWorkbookDefault;
                    break;
                case "xlxs":
                    XlFileType = Excel.Enums.XlFileFormat.xlOpenXMLStrictWorkbook;
                    break;
                case "xml":
                    XlFileType = Excel.Enums.XlFileFormat.xlXMLSpreadsheet;
                    break;
                case "csv":
                    XlFileType = Excel.Enums.XlFileFormat.xlCSV;
                    break;
                default:
                    XlFileType = Excel.Enums.XlFileFormat.xlWorkbookDefault;
                    break;
            }
            if (isCopy)
            {
                this.workbook.SaveCopyAs(fileName);
            }
            else
            {
                this.workbook.SaveAs(fileName, XlFileType);
            }
        }
        #endregion save

        /// <summary>
        /// Add a new document
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        
        
        /// <summary>
        /// Find and replace in presentation
        /// </summary>
        /// <param name="parameters"></param>
        private void TextReplace(Dictionary<string, object> parameters)
        {
            string find = null;
            string replace = null;
            Dictionary<string, object> replaces = null;
            Dictionary<string, string> newReplaces = null;
            object tmp;

            if (parameters.TryGetValue("find", out tmp))
            {
                find = (string)tmp;
            }
            if (parameters.TryGetValue("replace", out tmp))
            {
                replace = (string)tmp;
            }
            
            if (parameters.TryGetValue("batch", out tmp))
            {
                replaces = (tmp as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value);
                newReplaces = new Dictionary<string, string>();
                // repalce in Array
                foreach(var i in replaces) 
                {
                    var newValue = i.Value.ToString();
                    foreach(var j in replaces) 
                    {
                        newValue = newValue.Replace(j.Key, j.Value.ToString());
                    }
                    newReplaces.Add(i.Key, newValue);
                }
            }
        }

        /// <summary>
        /// Init slide Array
        /// </summary>
        /// <returns></returns>
        private object Workbooks(IDictionary<string, object> filter)
        {
            List<object> workbooks = new List<object>();

            foreach (Excel.Workbook wdWorkbook in this.application.Workbooks)
            {

                var workbook = new Workbook(wdWorkbook);
                workbooks.Add(workbook.Invoke());

            }

            return workbooks.ToArray();
        }

        
        /// <summary>
        /// 
        /// </summary>
        public Excel.Workbook GetUnderlyingObject()
        {
            return this.workbook;
        }
        
        #region Properties

        public string Name
        {
            get
            {
                return this.workbook.Name;
            }
        }
        public string Path
        {
            get
            {
                return this.workbook.Path;
            }
        }
        public string FullName
        {
            get
            {
                return this.workbook.FullName;
            }
        }
        
        public string sheets
        {
            get
            {
                return this.workbook.Sheets.ToString();   
            }
        }

        #endregion


    }
}
