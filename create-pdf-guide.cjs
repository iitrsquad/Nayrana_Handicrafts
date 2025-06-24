const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function createPDFGuide() {
    console.log('🎨 Creating beautiful PDF tourist guide...');
    
    try {
        // Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Read HTML file
        const htmlPath = path.join(__dirname, 'tourist-guide.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        
        // Set content
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });
        
        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            },
            displayHeaderFooter: false,
            preferCSSPageSize: true
        });
        
        // Save PDF
        const outputPath = path.join(__dirname, 'Nayrana-Handicrafts-Tourist-Guide.pdf');
        fs.writeFileSync(outputPath, pdfBuffer);
        
        console.log('✅ PDF created successfully!');
        console.log(`📄 Saved as: ${outputPath}`);
        
        await browser.close();
        
    } catch (error) {
        console.error('❌ Error creating PDF:', error);
    }
}

// Run if called directly
if (require.main === module) {
    createPDFGuide();
}

module.exports = createPDFGuide; 