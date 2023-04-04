import { useState, useEffect } from "https://esm.sh/preact@10.11.0/hooks";

export interface DarkModeProps {
    darkMode: boolean;
  }

export default function DarkModeToggle(props: DarkModeProps) {
    const [darkMode, toggleDarkModeData] = useState<boolean | null>(false);
    useEffect(() => {
        initTheme(
            darkMode,
            toggleDarkModeData
        );
    }, [])
    return (
        <>
            <a class="darkModeToggle" onClick={(a) => { toggleDarkMode1(darkMode, toggleDarkModeData)}} >
                {!darkMode && <i class="fa fa-moon-o" aria-hidden="true"></i>}
                {darkMode && <i class="fa fa-sun-o" aria-hidden="true"></i>}
            </a>
        </>
    )
}

function toggleDarkMode1(darkMode: boolean,
                         toggleDarkModeData: (data: boolean | null) => void) {
    setMode(!darkMode, toggleDarkModeData);
}

function initTheme(darkMode: boolean,
                  toggleDarkModeData: (data: boolean | null) => void) {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    toggleDarkModeData(prefersDarkMode);
    setMode(!prefersDarkMode, toggleDarkModeData);
}

function setMode(darkMode: boolean,
                 toggleDarkModeData: (data: boolean | null) => void) {
    toggleDarkModeData(darkMode);
    let body = document.body;
    body.style.backgroundColor = darkMode ? "white" : "black" ;
    document.querySelectorAll("p, li, h1, h2, h3, a").forEach(p => { 
        p.style.color = darkMode ? "black" : "white" ; 
    });
}