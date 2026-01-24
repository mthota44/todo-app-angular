import { HttpInterceptorFn } from '@angular/common/http';

/**
 * =========================================================================================
 * 🛡️ HTTP INTERCEPTORS EXPLAINED
 * =========================================================================================
 * 
 * 1. WHAT IS AN INTERCEPTOR?
 *    Think of an Interceptor as a "Middleman" or a "Checkpoint" for your HTTP requests.
 *    Every time your app sends a request (GET, POST, etc.) or receives a response,
 *    it MUST pass through this interceptor first.
 * 
 *    Browser -> [Interceptor] -> Server
 *    Browser <- [Interceptor] <- Server
 * 
 * 2. WHY USE IT?
 *    - **Auth Tokens**: Automatically add "Authorization: Bearer xyz" to EVERY request.
 *    - **Logging**: Console log every URL being called (great for debugging).
 *    - **Loading Spinners**: Show a global spinner when a request starts, hide it when done.
 *    - **Error Handling**: Catch 401/403/500 errors globally in one place.
 * 
 * 3. HOW IT WORKS (Functional Interceptor):
 *    In modern Angular, we use a simple function 'HttpInterceptorFn'.
 *    - 'req': The outgoing request object.
 *    - 'next': The function to call to let the request continue to the server.
 */

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

    // LOGIC BEFORE REQUEST IS SENT
    console.log(`[Interceptor] 📡 Request sent to: ${req.url}`);

    // Example: Modifying the request to add a dummy Auth token
    // Note: Requests are immutable, so we must 'clone' it to change it.
    const modifiedReq = req.clone({
        setHeaders: {
            'X-Custom-Auth': 'My-Secret-Token-123'
        }
    });

    // 'next(req)' passes the request forward.
    // .pipe() allows us to look at the RESPONSE coming back.
    return next(modifiedReq);
};
