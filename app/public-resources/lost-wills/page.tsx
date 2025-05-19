"use server";

export default async function LostWillsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Lost Wills</h2>
        <p className="mb-4">
          When an attorney who has prepared client wills retires, they often
          assign their files to an active attorney to hold for future use. We
          invite any attorneys who are holding wills of this nature to list the
          retired attorneys&apos; names for reference.
        </p>
        <h3 className="text-2xl font-bold mb-2 text-red-600">
          Matthew St. Martin, Esq.
        </h3>
        <p className="mb-4">
          <a
            href="mailto:Matt@StMartinLawOffice.com"
            className="text-blue-600 hover:underline"
          >
            Matt@StMartinLawOffice.com
          </a>
        </p>
        <p className="mb-2">Holding files for:</p>
        <ul className="list-disc pl-6 mb-8">
          <li>Mike Calarco</li>
          <li>Rick Wunder</li>
          <li>Bob DiNieiri</li>
          <li>Denise Munson</li>
          <li>Pat Crippen</li>
          <li>Robert L. Purchase</li>
          <li>Mary Ellen Walsh</li>
          <li>J. Walsh</li>
          <li>Tom Biddle</li>
        </ul>
      </section>
    </main>
  );
}
