

import ClientComponent from './ClientComponent';
export function generateStaticParams() {
  const types = ['purchase', 'sale', 'saleswithpurchase',"remortage","equity"]; // Example types
  return types.map(type => ({
    type,
  }));
}

export default async function Page({ params }) {
  const { type } = await params;

 return (
    <div>

      <ClientComponent type={type} />
    </div>
  );
}

