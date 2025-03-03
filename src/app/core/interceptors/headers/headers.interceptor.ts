import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService)
  spinner.show();
  if (localStorage.getItem('token')) {
    
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!
      }
    })
  }
  return next(req).pipe(finalize(() => spinner.hide()));
};
