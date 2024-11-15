"use client";
function error({ error, reset }: { error: any; reset: any }) {
  return (
    <div className="container my-3 d-flex justify-content-center">
      <p>{error.message}</p>
      <button className="btn btn-primary btn-sm" onClick={() => reset()}>
        بازگشت
      </button>
    </div>
  );
}

export default error;
