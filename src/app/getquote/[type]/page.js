

import ClientComponent from './ClientComponent';
export function generateStaticParams() {
  const types = ['purchase', 'sales', 'saleswithpurchase', 'remortage', 'equity', 'surveyor'];
  return types.map((type) => ({
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

