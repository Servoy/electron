using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Word = NetOffice.WordApi;
using NetOffice.OfficeApi.Enums;
using System.Globalization;

namespace OfficeScript.Report
{
    public class Document : IDisposable
    {
        private bool disposed;
        private Word.Document document;
        private Word.Application application;
        private const OfficeScriptType officeScriptType = OfficeScriptType.Document;
        private bool closeDocument = true;
        private WordTags tags;
        private DocumentProperty properties;
        public Document(Word.Document document)
        {
            this.document = document;
            this.tags = new WordTags(this.document);
            this.properties = new DocumentProperty(this.document);
        }

        // Destruktor
        ~Document()
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
                        this.document.Saved = true;
                        this.document.Close();
                    }
                    this.document.Dispose();

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
                documents = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        input = (input == null) ? new Dictionary<string, object>() : input;
                        return this.Documents((input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value));
                    }
                ),
                addTable = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        if (input is string)
                        {
                            var tmp = new Dictionary<string, object>();
                            tmp.Add("name", input);
                            input = tmp;
                        }
                        if (input is int)
                        {
                            var tmp = new Dictionary<string, object>();
                            tmp.Add("pos", input);
                            input = tmp;
                        }
                        input = (input == null) ? new Dictionary<string, object>() : input;
                        return this.AddTable((input as IDictionary<string, object>).ToDictionary(d => d.Key, d => d.Value));
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
                        this.document.Dispose();
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
            this.document.Save();
        }

        private void SaveAs(IDictionary<string, object> parameters)
        {
            string name = (string)(parameters as IDictionary<string, object>)["name"];
            string type = "docx";
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
            Word.Enums.WdSaveFormat wdFileType;

            switch (fileType.ToLower())
            {
                case "doc":
                    wdFileType = Word.Enums.WdSaveFormat.wdFormatDocument;
                    break;
                case "docx":
                    wdFileType = Word.Enums.WdSaveFormat.wdFormatDocumentDefault;
                    break;
                case "pdf":
                    wdFileType = Word.Enums.WdSaveFormat.wdFormatPDF;
                    break;
                default:
                    wdFileType = Word.Enums.WdSaveFormat.wdFormatDocumentDefault;
                    break;
            }
            if (isCopy)
            {
                this.document.SaveCopyAs(fileName, wdFileType);
            }
            else
            {
                this.document.SaveAs(fileName, wdFileType);
            }
        }
        #endregion save

        /// <summary>
        /// Add a new document
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        private object AddTable(Dictionary<string, object> parameters)
        {
            int start = 0;
            int end = 0;
            int rows = 0;
            int columns = 0;
            object tmpObject;
            int tmpInt;

            if (parameters.TryGetValue("start", out tmpObject))
            {
                if (int.TryParse(tmpObject.ToString(), out tmpInt))
                {
                    start = tmpInt;
                }
            }

            if (parameters.TryGetValue("end", out tmpObject))
            {
                if (int.TryParse(tmpObject.ToString(), out tmpInt))
                {
                    end = tmpInt;
                }
            }

            if (parameters.TryGetValue("columns", out tmpObject))
            {
                if (int.TryParse(tmpObject.ToString(), out tmpInt))
                {
                    columns = tmpInt;
                }
            }

            if (parameters.TryGetValue("rows", out tmpObject))
            {
                if (int.TryParse(tmpObject.ToString(), out tmpInt))
                {
                    rows = tmpInt;
                }
            }
 
            Word.Range tableLocation = application.ActiveDocument.Range(start, end);
            Word.Table table = this.document.Tables.Add(this.application.Selection.Range, rows, columns);
            return new Word.Table(table);
        }
        
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
        private object Documents(IDictionary<string, object> filter)
        {
            List<object> documents = new List<object>();

            foreach (Word.Document wdDocument in this.application.Documents)
            {

                var document = new Document(wdDocument);
                documents.Add(document.Invoke());

            }

            return documents.ToArray();
        }



        /// <summary>
        /// 
        /// </summary>
        public Word.Document GetUnderlyingObject()
        {
            return this.document;
        }
        
        #region Properties

        public string Name
        {
            get
            {
                return this.document.Name;
            }
        }
        public string Path
        {
            get
            {
                return this.document.Path;
            }
        }
        public string FullName
        {
            get
            {
                return this.document.FullName;
            }
        }
        
        public string words 
        {
            get
            {
                return this.document.Words.ToString();   
            }
        }

        #endregion


    }
}
