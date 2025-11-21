

import ClientComponent from './ClientComponent';
export function generateStaticParams() {
  const types = ['44', 'sales', 'type3']; // Example types
  return types.map(type => ({
    type,
  }));
}

export default function Page({ params }) {
  const { type } = params;

 return (
    <div>

      <ClientComponent type={type} />
    </div>
  );
}

