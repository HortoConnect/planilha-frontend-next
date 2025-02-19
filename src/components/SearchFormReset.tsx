"use client"

import Link from "next/link";
import {X} from "lucide-react";

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        const input = document.querySelector('input[name="query"]') as HTMLInputElement;

        if (input) {
            input.value = ''; 
        }

        if(form) form.reset();
    }

    return (
        <button type="reset" onClick={reset}>
            <Link href="/produtos">
                <X />
            </Link>
        </button>
    )
}
export default SearchFormReset