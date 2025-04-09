// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodideInstance: any = null;
declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loadPyodide?: (options: { indexURL: string }) => Promise<any>
    }
  }
export const loadPyodideOnce = async () => {
  if (pyodideInstance) {
    return pyodideInstance;
  }
  console.log(1)
  if (typeof window === "undefined") return null;


  if (!window.loadPyodide) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  pyodideInstance = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
  });

  return pyodideInstance;
};
