import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Image } from 'react-bootstrap';

export default function ImageModal({ img }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='m-2'>
			<Image src={img} wodth='50' height='50' onClick={() => setIsOpen(true)} />
			{isOpen && (
				<Lightbox
					style={{ zIndex: 100000000 }}
					mainSrc={img}
					onCloseRequest={() => setIsOpen(false)}
				/>
			)}
		</div>
	);
}
