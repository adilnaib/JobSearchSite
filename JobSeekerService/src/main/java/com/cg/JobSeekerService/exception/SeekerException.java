package com.cg.JobSeekerService.exception;


public class SeekerException extends RuntimeException {

    public SeekerException() {
        super();
    }

    public SeekerException(String message) {
        super(message);
    }

    public SeekerException(String message, Throwable cause) {
        super(message, cause);
    }

    public SeekerException(Throwable cause) {
        super(cause);
    }
}
