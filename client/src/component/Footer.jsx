import React, {  } from "react";

export default function Footer(){
  return (
    <footer className="bg-light py-3">
      <p className="text-center">
        No Copyright &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};
