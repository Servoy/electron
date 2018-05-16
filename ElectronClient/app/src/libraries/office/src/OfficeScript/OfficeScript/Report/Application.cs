using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PowerPoint = NetOffice.PowerPointApi;
using Word = NetOffice.WordApi;
using Excel = NetOffice.ExcelApi;

namespace OfficeScript.Report
{

    public class WordApplication : IDisposable
    {
        private Word.Application application = null;
        private bool closeApplication = false;
        private bool disposed = false;


        // Constructor
        ~WordApplication()
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
                    if (this.closeApplication)
                    {

                        this.application.Quit();
                    }
                    this.application.Dispose();
                    this.application = null;
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
                open = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.Open((string)input).Invoke();
                    }),
                fetch = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.Fetch((string)input).Invoke();
                    }),
                quit = (Func<object, Task<object>>)(
                    async (input) =>
                    {

                        if (input != null)
                        {
                            if ((bool)input == true)
                            {
                                this.closeApplication = false;
                            }
                            else if ((bool)input == false)
                            {
                                this.closeApplication = false;
                            }
                        }
                        this.Dispose();
                        return null;
                    })
            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Document Open(string name)
        {
            //try to get the active PPT Instance
            this.application = Word.Application.GetActiveInstance();
            if (this.application == null)
            {
                //start PPT if ther is no active instance
                this.application = new Word.Application();
                this.closeApplication = true;
            }

            name = name.Replace('/', '\\');
            return new Document(this.application.Documents.Open(name));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Document Fetch(string name)
        {
            //try to get the active PPT Instance
            this.application = Word.Application.GetActiveInstance();
            if (this.application == null)
            {
                //start PPT if ther is no active instance
                throw new Exception("Missing Word Application");
            }
            Word.Document document = null;
            if (name != null)
            {
                try
                {
                    document = new Word.Document(this.application.Documents[name]);
                }
                catch
                {
                    throw new Exception("Cannot find the word documents");
                }
            }
            else
            {
                document = new Word.Document(this.application.ActiveDocument);

            }

            return new Document(document);
        }

        /// <summary>
        /// 
        /// </summary>
        public Word.Application GetUnderlyingObject()
        {
            return this.application;
        }

    }

    public class ExcelApplication : IDisposable
    {

        private Excel.Application application = null;
        private bool closeApplication = false;
        private bool disposed = false;


        // Destruktor
        ~ExcelApplication()
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
                    if (this.closeApplication)
                    {

                        this.application.Quit();
                    }
                    this.application.Dispose();
                    this.application = null;
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
                open = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.Open((string)input).Invoke();
                    }),
                fetch = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.Fetch((string)input).Invoke();
                    }),
                quit = (Func<object, Task<object>>)(
                    async (input) =>
                    {

                        if (input != null)
                        {
                            if ((bool)input == true)
                            {
                                this.closeApplication = false;
                            }
                            else if ((bool)input == false)
                            {
                                this.closeApplication = false;
                            }
                        }
                        this.Dispose();
                        return null;
                    })
            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Workbook Open(string name)
        {
            //try to get the active PPT Instance
            this.application = Excel.Application.GetActiveInstance();
            if (this.application == null)
            {
                //start PPT if ther is no active instance
                this.application = new Excel.Application();
                this.closeApplication = true;
            }

            this.application.Visible = true;
            name = name.Replace('/', '\\');
            return new Workbook(this.application.Workbooks.Open(name));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Workbook Fetch(string name)
        {
            //try to get the active PPT Instance
            this.application = Excel.Application.GetActiveInstance();
            if (this.application == null)
            {
                //start PPT if ther is no active instance
                throw new Exception("Missing PowerPoint Application");
            }
            this.application.Visible = true;
            Workbook workbook = null;
            if (name != null)
            {
                try
                {
                    workbook = new Workbook(this.application.Workbooks[name]);
                }
                catch
                {
                    throw new Exception("Cannot find the PowerPoint presentations");
                }
            }
            else
            {
                workbook = new Workbook(this.application.ActiveWorkbook);

            }

            return workbook;
        }

        /// <summary>
        /// 
        /// </summary>
        public Excel.Application GetUnderlyingObject()
        {
            return this.application;
        }

    }


    public class PowerPointApplication : IDisposable
    {

        private PowerPoint.Application application = null;
        private bool closeApplication = false;
        private bool disposed = false;


        // Destruktor
        ~PowerPointApplication()
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
                    if (this.closeApplication)
                    {

                        this.application.Quit();
                    }
                    this.application.Dispose();
                    this.application = null;
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
                open = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.Open((string)input).Invoke();
                    }),
                fetch = (Func<object, Task<object>>)(
                    async (input) =>
                    {
                        return this.Fetch((string)input).Invoke();
                    }),
                quit = (Func<object, Task<object>>)(
                    async (input) =>
                    {

                        if (input != null)
                        {
                            if ((bool)input == true)
                            {
                                this.closeApplication = false;
                            }
                            else if ((bool)input == false)
                            {
                                this.closeApplication = false;
                            }
                        }
                        this.Dispose();
                        return null;
                    })
            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Presentation Open(string name)
        {
            //try to get the active PPT Instance
            this.application = PowerPoint.Application.GetActiveInstance();
            if (this.application == null)
            {
                //start PPT if ther is no active instance
                this.application = new PowerPoint.Application();
                this.closeApplication = true;
            }

            this.application.Visible = NetOffice.OfficeApi.Enums.MsoTriState.msoTrue;
            name = name.Replace('/', '\\');
            return new Presentation(this.application.Presentations.Open(name));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Presentation Fetch(string name)
        {
            //try to get the active PPT Instance
            this.application = PowerPoint.Application.GetActiveInstance();
            if (this.application == null)
            {
                //start PPT if ther is no active instance
                throw new Exception("Missing PowerPoint Application");
            }
            this.application.Visible = NetOffice.OfficeApi.Enums.MsoTriState.msoTrue;
            Presentation presentation = null;
            if (name != null)
            {
                try
                {
                    presentation = new Presentation(this.application.Presentations[name]);
                }catch
                {  
                    throw new Exception("Cannot find the PowerPoint presentations");
                }
            }
            else
            {
                presentation = new Presentation(this.application.ActivePresentation);

            }
            
            return presentation;
        }

        /// <summary>
        /// 
        /// </summary>
        public PowerPoint.Application GetUnderlyingObject()
        {
            return this.application;
        }

    }
}
