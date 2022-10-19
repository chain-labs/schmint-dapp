export default function scrollIntoView(id: string) {
	document?.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
