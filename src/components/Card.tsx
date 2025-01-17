import React, { useRef, useState } from 'react'

interface Card {
    title: string
}

const Card = ({ title }: Card) => {
    const [image, setImage] = useState<string | null>(null);
    const [to, setTo] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [from, setFrom] = useState<string>("");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement("a");
            link.download = "greeting-card.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        }
    };

    const renderCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && image) {
            const ctx = canvas.getContext("2d");
            const img = new Image();

            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx?.drawImage(img, 0, 0, img.width, img.height);

                if (ctx) {
                    ctx.font = '30px "Charmonman", sans-serif';
                    ctx.fillStyle = "#7F604A";

                    // Add "To" field
                    ctx.fillText(to, canvas.width / 2 - 25, canvas.height / 2 - 100);

                    // Add "Message" field
                    if (message.length > 25) {
                        ctx.fillText(message.substring(0, 24), canvas.width / 3 - 20, canvas.height / 2 - 48);
                        ctx.fillText(message.substring(24, message.length), canvas.width / 3 - 20, canvas.height / 2 + 5);
                    } else {
                        ctx.fillText(message, canvas.width / 3 - 20, canvas.height / 2 - 48);
                    }

                    // Add "From" field
                    ctx.fillText(from, canvas.width / 2 - 50, canvas.height / 2 + 60);
                }
            };
        }
    };

    React.useEffect(() => {
        renderCanvas();
    }, [image, to, message, from]);

    return (
        <div className='lg:w-[70%] md:w-[80%] sm:w-[90%] w-full flex flex-col bg-white shadow-lg'>
            <div className="card-header border-b-2 border-slate-300 w-full py-5 pb-8 px-5">
                <h1 className='text-3xl font-semibold'>{title}</h1>
            </div>

            <div className="card-body py-8 pb-5 px-5">
                {
                    image &&
                    <div className="img-display mb-14">
                        <img
                            src={image}
                            alt="Uploaded Preview"
                            className="w-full h-auto rounded shadow"
                        />
                    </div>
                }
                {/* Input group 1 */}
                <div className="input-group mb-14">
                    <label htmlFor="FileUpload">File Upload</label>
                    <div
                        id="FileUpload"
                        className="relative mt-2 mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray-50 px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                    >
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                            onChange={handleImageChange}
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <span className="flex h-10 w-10 items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                    className="h-8 w-8 text-primary"
                                >
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                                </svg>
                            </span>
                            <p className="text-md font-medium">Browse Files</p>
                            <p className="mt-1.5 text-sm">Drag and drop files here</p>
                        </div>
                    </div>
                </div>

                {/* Input group 2 */}
                <div className="input-group mb-14 flex flex-col">
                    <label htmlFor="input-to" className='mb-2'>Dear</label>
                    <input id='input-to' maxLength={14} value={to} onChange={(e) => setTo(e.target.value)} type="text" className='md:w-1/2 w-full px-3 py-3 border border-gray-300 rounded focus:outline-none active:outline-none' />
                </div>

                {/* Input group 3 */}
                <div className="input-group mb-14 flex flex-col">
                    <label htmlFor="input-message" className='mb-2'>Message</label>
                    <input id='input-message' maxLength={50} value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='md:w-1/2 w-full px-3 py-3 border border-gray-300 rounded focus:outline-none active:outline-none' />
                </div>

                {/* Input group 3 */}
                <div className="input-group mb-14 flex flex-col">
                    <label htmlFor="input-from" className='mb-2'>From</label>
                    <input id='input-from' maxLength={14} value={from} onChange={(e) => setFrom(e.target.value)} type="text" className='md:w-1/2 w-full px-3 py-3 border border-gray-300 rounded focus:outline-none active:outline-none' />
                </div>

            </div>
            <canvas ref={canvasRef} className='hidden'></canvas>
            <div className="card-footer border-t-2 border-slate-300 w-full py-5 pb-8 flex justify-center">
                <button onClick={handleDownload} disabled={!image || !to || !message || !from} className={`px-10 py-3 ${!image || !to || !message || !from ? 'bg-green-200 cursor-not-allowed' : 'bg-green-400 hover:bg-green-500 transition-colors'} text-white rounded`}>Download</button>
            </div>
        </div>
    )
}

export default Card