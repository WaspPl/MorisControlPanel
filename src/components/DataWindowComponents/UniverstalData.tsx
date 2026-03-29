type Props = {
	data: any;
};

function UniversalData({ data }: Props) {
	return <div>{JSON.stringify(data)}</div>;
}

export default UniversalData;
