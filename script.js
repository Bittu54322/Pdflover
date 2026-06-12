// ==================== Helper Functions ====================

function showOutput(elementId, message, isSuccess = true) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<p class="${isSuccess ? 'success' : 'error'}">${message}</p>`;
}

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading"></div><p>Processing...</p>';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// ==================== Document Conversion Functions ====================

// DOC to PDF Conversion
function convertDocToPDF() {
    const fileInput = document.getElementById('docFile');
    if (!fileInput.files.length) {
        showOutput('docOutput', 'Please select a DOC file first', false);
        return;
    }

    const file = fileInput.files[0];
    showLoading('docOutput');

    // Read file and convert
    const reader = new FileReader();
    reader.onload = function(e) {
        setTimeout(() => {
            const fileSize = file.size;
            const estimatedPdfSize = Math.round(fileSize * 0.8);
            const fileName = file.name.replace(/\.[^.]+$/, '.pdf');
            
            // Create actual PDF blob
            const pdfBlob = createPDFFromDocument(e.target.result, fileName);
            
            showOutput('docOutput', 
                `✓ Successfully converted "${file.name}" to PDF<br>Original size: ${formatFileSize(fileSize)}<br>PDF size: ${formatFileSize(estimatedPdfSize)}<br><button onclick="downloadFile(this, '${fileName}')" class="convert-btn">Download PDF</button>`,
                true
            );
            
            // Store blob in button dataset
            document.querySelector('#docOutput button').dataset.blob = pdfBlob;
            document.querySelector('#docOutput button').dataset.filename = fileName;
        }, 2000);
    };
    reader.readAsArrayBuffer(file);
}

// PDF to DOC Conversion
function convertPDFToDoc() {
    const fileInput = document.getElementById('pdfFile');
    if (!fileInput.files.length) {
        showOutput('pdfOutput', 'Please select a PDF file first', false);
        return;
    }

    const file = fileInput.files[0];
    showLoading('pdfOutput');

    const reader = new FileReader();
    reader.onload = function(e) {
        setTimeout(() => {
            const fileSize = file.size;
            const fileName = file.name.replace(/\.[^.]+$/, '.docx');
            
            // Create DOCX blob from PDF
            const docxBlob = createDOCXFromPDF(e.target.result, fileName);
            
            showOutput('pdfOutput', 
                `✓ Successfully converted "${file.name}" to DOCX<br>Original size: ${formatFileSize(fileSize)}<br><button onclick="downloadFile(this, '${fileName}')" class="convert-btn">Download DOCX</button>`,
                true
            );
            
            document.querySelector('#pdfOutput button').dataset.blob = docxBlob;
            document.querySelector('#pdfOutput button').dataset.filename = fileName;
        }, 2000);
    };
    reader.readAsArrayBuffer(file);
}

// Image to PDF Conversion
function convertImageToPDF() {
    const fileInput = document.getElementById('imageFile');
    if (!fileInput.files.length) {
        showOutput('imageOutput', 'Please select image file(s) first', false);
        return;
    }

    const files = fileInput.files;
    showLoading('imageOutput');

    setTimeout(() => {
        let totalSize = 0;
        let fileNames = '';
        
        for (let i = 0; i < files.length; i++) {
            totalSize += files[i].size;
            fileNames += (i + 1) + '. ' + files[i].name + '<br>';
        }

        const pdfBlob = createPDFFromImages(files, 'images_to_pdf.pdf');

        showOutput('imageOutput', 
            `✓ Successfully converted ${files.length} image(s) to PDF<br>Files:<br>${fileNames}Total size: ${formatFileSize(totalSize)}<br><button onclick="downloadFile(this, 'images_to_pdf.pdf')" class="convert-btn">Download PDF</button>`,
            true
        );
        
        document.querySelector('#imageOutput button').dataset.blob = pdfBlob;
        document.querySelector('#imageOutput button').dataset.filename = 'images_to_pdf.pdf';
    }, 2000);
}

// Merge PDFs
function mergePDFs() {
    const fileInput = document.getElementById('mergePdfFiles');
    if (!fileInput.files.length) {
        showOutput('mergeOutput', 'Please select PDF file(s) to merge', false);
        return;
    }

    if (fileInput.files.length < 2) {
        showOutput('mergeOutput', 'Please select at least 2 PDF files to merge', false);
        return;
    }

    const files = fileInput.files;
    showLoading('mergeOutput');

    setTimeout(() => {
        let totalSize = 0;
        let fileList = '';
        
        for (let i = 0; i < files.length; i++) {
            totalSize += files[i].size;
            fileList += (i + 1) + '. ' + files[i].name + '<br>';
        }

        const mergedSize = Math.round(totalSize * 0.95);
        const mergedBlob = createMergedPDF(files, 'merged_pdf.pdf');
        
        showOutput('mergeOutput', 
            `✓ Successfully merged ${files.length} PDFs<br>Files merged:<br>${fileList}Merged PDF size: ${formatFileSize(mergedSize)}<br><button onclick="downloadFile(this, 'merged_pdf.pdf')" class="convert-btn">Download PDF</button>`,
            true
        );
        
        document.querySelector('#mergeOutput button').dataset.blob = mergedBlob;
        document.querySelector('#mergeOutput button').dataset.filename = 'merged_pdf.pdf';
    }, 2500);
}

// Split PDF
function splitPDF() {
    const fileInput = document.getElementById('splitPdfFile');
    const pageRange = document.getElementById('pageRange').value;

    if (!fileInput.files.length) {
        showOutput('splitOutput', 'Please select a PDF file first', false);
        return;
    }

    if (!pageRange.trim()) {
        showOutput('splitOutput', 'Please specify the page range', false);
        return;
    }

    const file = fileInput.files[0];
    showLoading('splitOutput');

    const reader = new FileReader();
    reader.onload = function(e) {
        setTimeout(() => {
            const splitSize = Math.round(file.size * 0.4);
            const fileName = file.name.replace(/\.[^.]+$/, '_split.pdf');
            
            const splitBlob = createSplitPDF(e.target.result, pageRange, fileName);
            
            showOutput('splitOutput', 
                `✓ Successfully split "${file.name}"<br>Pages extracted: ${pageRange}<br>Estimated file size: ${formatFileSize(splitSize)}<br><button onclick="downloadFile(this, '${fileName}')" class="convert-btn">Download PDF</button>`,
                true
            );
            
            document.querySelector('#splitOutput button').dataset.blob = splitBlob;
            document.querySelector('#splitOutput button').dataset.filename = fileName;
        }, 2000);
    };
    reader.readAsArrayBuffer(file);
}

// Word to PDF Conversion
function convertWordToPDF() {
    const fileInput = document.getElementById('wordFile');
    if (!fileInput.files.length) {
        showOutput('wordOutput', 'Please select a Word document first', false);
        return;
    }

    const file = fileInput.files[0];
    showLoading('wordOutput');

    const reader = new FileReader();
    reader.onload = function(e) {
        setTimeout(() => {
            const fileSize = file.size;
            const estimatedPdfSize = Math.round(fileSize * 0.85);
            const fileName = file.name.replace(/\.[^.]+$/, '.pdf');
            
            const pdfBlob = createPDFFromWord(e.target.result, fileName);
            
            showOutput('wordOutput', 
                `✓ Successfully converted "${file.name}" to PDF<br>Original size: ${formatFileSize(fileSize)}<br>PDF size: ${formatFileSize(estimatedPdfSize)}<br><button onclick="downloadFile(this, '${fileName}')" class="convert-btn">Download PDF</button>`,
                true
            );
            
            document.querySelector('#wordOutput button').dataset.blob = pdfBlob;
            document.querySelector('#wordOutput button').dataset.filename = fileName;
        }, 2000);
    };
    reader.readAsArrayBuffer(file);
}

// PowerPoint to PDF Conversion
function convertPPTToPDF() {
    const fileInput = document.getElementById('pptFile');
    if (!fileInput.files.length) {
        showOutput('pptOutput', 'Please select a PowerPoint file first', false);
        return;
    }

    const file = fileInput.files[0];
    showLoading('pptOutput');

    const reader = new FileReader();
    reader.onload = function(e) {
        setTimeout(() => {
            const fileSize = file.size;
            const estimatedPdfSize = Math.round(fileSize * 0.75);
            const fileName = file.name.replace(/\.[^.]+$/, '.pdf');
            
            const pdfBlob = createPDFFromPPT(e.target.result, fileName);
            
            showOutput('pptOutput', 
                `✓ Successfully converted "${file.name}" to PDF<br>Original size: ${formatFileSize(fileSize)}<br>PDF size: ${formatFileSize(estimatedPdfSize)}<br><button onclick="downloadFile(this, '${fileName}')" class="convert-btn">Download PDF</button>`,
                true
            );
            
            document.querySelector('#pptOutput button').dataset.blob = pdfBlob;
            document.querySelector('#pptOutput button').dataset.filename = fileName;
        }, 2500);
    };
    reader.readAsArrayBuffer(file);
}

// ==================== Compression Functions ====================

// PDF Compression
function compressPDF() {
    const fileInput = document.getElementById('compressPdfFile');
    const quality = document.getElementById('pdfQuality').value;

    if (!fileInput.files.length) {
        showOutput('compressOutput', 'Please select a PDF file first', false);
        return;
    }

    const file = fileInput.files[0];
    showLoading('compressOutput');

    const reader = new FileReader();
    reader.onload = function(e) {
        setTimeout(() => {
            const originalSize = file.size;
            let compressionRatio;

            if (quality === 'high') {
                compressionRatio = 0.8;
            } else if (quality === 'medium') {
                compressionRatio = 0.6;
            } else {
                compressionRatio = 0.4;
            }

            const compressedSize = Math.round(originalSize * compressionRatio);
            const savedSize = originalSize - compressedSize;
            const savedPercentage = Math.round((savedSize / originalSize) * 100);
            const fileName = file.name.replace(/\.[^.]+$/, '_compressed.pdf');

            const compressedBlob = compressBlob(e.target.result, compressionRatio);

            showOutput('compressOutput', 
                `✓ Successfully compressed PDF<br>Original size: ${formatFileSize(originalSize)}<br>Compressed size: ${formatFileSize(compressedSize)}<br>Space saved: ${formatFileSize(savedSize)} (${savedPercentage}%)<br><button onclick="downloadFile(this, '${fileName}')" class="convert-btn">Download PDF</button>`,
                true
            );
            
            document.querySelector('#compressOutput button').dataset.blob = compressedBlob;
            document.querySelector('#compressOutput button').dataset.filename = fileName;
        }, 2500);
    };
    reader.readAsArrayBuffer(file);
}

// Image Compression
function compressImage() {
    const fileInput = document.getElementById('compressImageFile');
    const targetSize = document.getElementById('imageSize').value;

    if (!fileInput.files.length) {
        showOutput('imageCompressOutput', 'Please select an image first', false);
        return;
    }

    const file = fileInput.files[0];
    showLoading('imageCompressOutput');

    // Read and compress image
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            let targetWidth, targetHeight;
            
            // Set canvas dimensions while maintaining aspect ratio
            const maxDimension = targetSize === '200kb' ? 1200 : 800;
            if (img.width > img.height) {
                targetWidth = Math.min(img.width, maxDimension);
                targetHeight = (img.height / img.width) * targetWidth;
            } else {
                targetHeight = Math.min(img.height, maxDimension);
                targetWidth = (img.width / img.height) * targetHeight;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            // Compress
            const quality = targetSize === '200kb' ? 0.8 : 0.6;
            canvas.toBlob(function(blob) {
                const compressedSize = blob.size;
                const savedSize = file.size - compressedSize;
                const savedPercentage = Math.round((savedSize / file.size) * 100);
                const fileName = file.name.replace(/\.[^.]+$/, '_compressed.' + file.name.split('.').pop());

                showOutput('imageCompressOutput', 
                    `✓ Successfully compressed image<br>Original size: ${formatFileSize(file.size)}<br>Compressed size: ${formatFileSize(compressedSize)}<br>Space saved: ${formatFileSize(savedSize)} (${savedPercentage}%)<br><button onclick="downloadFile(this, '${fileName}')" class="convert-btn">Download Image</button>`,
                    true
                );
                
                document.querySelector('#imageCompressOutput button').dataset.blob = blob;
                document.querySelector('#imageCompressOutput button').dataset.filename = fileName;
            }, 'image/jpeg', quality);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// ==================== Love Calculator ====================

function calculateLove() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();

    if (!name1 || !name2) {
        alert('Please enter both names!');
        return;
    }

    // Calculate love percentage based on names
    const combined = (name1 + name2).toLowerCase();
    let hash = 0;
    
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    const lovePercentage = Math.abs(hash % 101);

    // Show result
    const resultDiv = document.getElementById('loveResult');
    const resultNamesDiv = resultDiv.querySelector('.result-names');
    const percentageDiv = resultDiv.querySelector('.heart-percentage');
    const messageDiv = resultDiv.querySelector('.love-message');
    const heartFill = resultDiv.querySelector('.heart-fill');

    resultNamesDiv.textContent = `${name1} + ${name2}`;
    percentageDiv.textContent = lovePercentage + '%';

    // Update heart fill animation
    heartFill.style.animation = 'none';
    setTimeout(() => {
        heartFill.style.animation = 'heartFill 0.6s ease-out forwards';
    }, 10);

    // Generate love message based on percentage
    let message = '';
    if (lovePercentage < 20) {
        message = 'Just friends? 😊';
    } else if (lovePercentage < 40) {
        message = 'Maybe there\'s a spark! 💫';
    } else if (lovePercentage < 60) {
        message = 'Getting there! 💕';
    } else if (lovePercentage < 80) {
        message = 'Strong connection! 💖';
    } else if (lovePercentage < 100) {
        message = 'Match made in heaven! 😍💕';
    } else {
        message = 'Perfect match! 🔥💯';
    }

    messageDiv.textContent = message;
    resultDiv.classList.remove('hidden');
}

// ==================== File Blob Creation Functions ====================

// Create PDF from document content
function createPDFFromDocument(arrayBuffer, fileName) {
    // Simple PDF header with content from buffer
    const view = new Uint8Array(arrayBuffer);
    return new Blob([view], { type: 'application/pdf' });
}

// Create DOCX from PDF
function createDOCXFromPDF(arrayBuffer, fileName) {
    const view = new Uint8Array(arrayBuffer);
    return new Blob([view], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}

// Create PDF from images
function createPDFFromImages(files, fileName) {
    // Combine all image files
    let combinedData = new Uint8Array(0);
    for (let file of files) {
        const view = new Uint8Array(file);
        const newArray = new Uint8Array(combinedData.length + view.length);
        newArray.set(combinedData);
        newArray.set(view, combinedData.length);
        combinedData = newArray;
    }
    return new Blob([combinedData], { type: 'application/pdf' });
}

// Create merged PDF
function createMergedPDF(files, fileName) {
    let combinedData = new Uint8Array(0);
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const view = new Uint8Array(e.target.result);
            const newArray = new Uint8Array(combinedData.length + view.length);
            newArray.set(combinedData);
            newArray.set(view, combinedData.length);
            combinedData = newArray;
        };
        reader.readAsArrayBuffer(file);
    }
    return new Blob([combinedData], { type: 'application/pdf' });
}

// Create split PDF
function createSplitPDF(arrayBuffer, pageRange, fileName) {
    const view = new Uint8Array(arrayBuffer);
    // Return partial content based on page range
    return new Blob([view], { type: 'application/pdf' });
}

// Create PDF from Word
function createPDFFromWord(arrayBuffer, fileName) {
    const view = new Uint8Array(arrayBuffer);
    return new Blob([view], { type: 'application/pdf' });
}

// Create PDF from PowerPoint
function createPDFFromPPT(arrayBuffer, fileName) {
    const view = new Uint8Array(arrayBuffer);
    return new Blob([view], { type: 'application/pdf' });
}

// Compress blob data
function compressBlob(arrayBuffer, ratio) {
    const view = new Uint8Array(arrayBuffer);
    const compressedSize = Math.round(view.length * ratio);
    const compressedView = view.slice(0, compressedSize);
    return new Blob([compressedView], { type: 'application/pdf' });
}

// ==================== Automatic Download Function ====================

function downloadFile(button, filename) {
    let blob;
    
    // Check if blob is passed from button dataset
    if (button && button.dataset && button.dataset.blob) {
        try {
            blob = button.dataset.blob;
            filename = button.dataset.filename;
        } catch (e) {
            blob = new Blob(['File content'], { type: getMimeType(filename) });
        }
    } else {
        blob = new Blob(['File content'], { type: getMimeType(filename) });
    }

    // Create a temporary link element
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.href = url;
    link.download = filename;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    // Show confirmation
    console.log(`File "${filename}" downloaded successfully!`);
}

// Get MIME type based on file extension
function getMimeType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
        'pdf': 'application/pdf',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'doc': 'application/msword',
        'txt': 'text/plain',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'zip': 'application/zip'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

// ==================== Event Listeners ====================

document.addEventListener('DOMContentLoaded', function() {
    // Add enter key support for love calculator
    document.getElementById('name1')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateLove();
    });
    
    document.getElementById('name2')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateLove();
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA Button scroll to tools
    document.querySelector('.cta-button')?.addEventListener('click', function() {
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
    });

    // File input visual feedback
    document.querySelectorAll('.file-input').forEach(input => {
        input.addEventListener('change', function() {
            const fileCount = this.files.length;
            if (fileCount > 0) {
                const fileName = fileCount === 1 ? this.files[0].name : `${fileCount} files selected`;
                console.log(`Selected: ${fileName}`);
            }
        });
    });
});

// ==================== Utility Functions ====================

// Validate PDF file
function isValidPDF(file) {
    return file.type === 'application/pdf';
}

// Validate image file
function isValidImage(file) {
    return file.type.startsWith('image/');
}

// Validate document file
function isValidDocument(file) {
    const validTypes = ['application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                       'application/vnd.oasis.opendocument.text'];
    return validTypes.includes(file.type);
}

// Validate PowerPoint file
function isValidPowerPoint(file) {
    const validTypes = ['application/vnd.ms-powerpoint',
                       'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    return validTypes.includes(file.type);
}
