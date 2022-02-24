import { Button } from 'primereact/button';

export default function ButtonTrash(props) {
	return (
		<Button className='p-button-danger' {...props}>
			<i className='bi bi-trash-fill'></i>
		</Button>
	);
}
