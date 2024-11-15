"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ title, style }: { title: string; style: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={"btn " + style} disabled={pending}>
      {title}
      {pending && (
        <span className="spinner-border spinner-border-sm ms-2"></span>
      )}
    </button>
  );
}

export default SubmitButton;
