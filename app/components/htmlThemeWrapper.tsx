'use client';

import { useTheme } from "./themeContext";
import { useEffect } from "react";

export default function HtmlThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    console.log(theme);
  }, [theme]);

  return <>{children}</>;
}
