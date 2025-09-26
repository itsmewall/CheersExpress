import React from "react";

export function Card({ title, children, actions }) {
  return (
    <div className="card">
      {title && <div className="card-head">{title}</div>}
      <div className="card-body">
        {children}
        {actions}
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className="stack">
      {label && <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>{label}</label>}
      {children}
    </div>
  );
}

export function Input(props){ return <input className="input" {...props} />; }
export function Select(props){ return <select className="select" {...props} />; }
export function Textarea(props){ return <textarea className="textarea" {...props} />; }

export function Button({ variant="brand", ...rest }){
  const cls = variant === "light" ? "btn btn-light" :
              variant === "danger" ? "btn btn-danger" :
              "btn btn-brand";
  return <button className={cls} {...rest} />;
}