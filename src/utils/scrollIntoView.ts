export default function scrollIntoView(id: string, options?: ScrollIntoViewOptions) {
	document?.getElementById(id)?.scrollIntoView({
		behavior: options?.behavior ?? 'smooth',
		block: options?.block ?? 'center',
	});
}
