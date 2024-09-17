#Bill Generator
This project is a React.js based bill generation application designed for generating invoices with dynamic VAT calculations, itemized billing, and PDF download functionality. It allows users to add multiple subscription items, automatically calculates totals including VAT, and converts dates between the AD and Nepali BS formats.

#Features
Dynamic Item Input: Add multiple subscription items with prices and durations.
Duration-based Pricing: Select predefined subscription durations and automatically assign corresponding prices.
Date Conversion: Converts input dates from AD to Nepali BS using the NepaliDate library.
VAT Calculation: Automatically calculates a 13% VAT on the total amount.
PDF Export: Generates a PDF of the invoice using html2pdf.js.
Responsive UI: Built with Tailwind CSS for a responsive and user-friendly design.

#Technologies Used
React.js: JavaScript library for building the user interface.
Tailwind CSS: Utility-first CSS framework for styling.
Vite: Next generation front-end build tool for development and production.
html2pdf.js: JavaScript library for converting HTML to PDF.
NepaliDate: Library for converting AD dates to the Nepali BS calendar.#Usage
Open the app in your browser at http://localhost:3000 after running the development server.
Enter the client details, such as Client Name and Client VAT Number.
Add subscription items by selecting the duration (1 day, 1 month, etc.), and the app will automatically set the price.
The app calculates VAT (13%) on the total and shows the net payable amount.
Once ready, click the Download PDF button to download the invoice.

#How to Customize
Company Name & VAT: Modify the default company name and VAT number by editing the state values in the BillForm.jsx.
Duration Options: You can modify the pricing and duration options in the durationOptions array.
Styling: The project uses Tailwind CSS for styling. To customize the look and feel, update the classes in the respective JSX files.
