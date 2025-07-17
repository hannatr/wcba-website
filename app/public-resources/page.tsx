"use server";

import { Separator } from "@/components/ui/separator";
import Disclaimer from "@/components/Disclaimer";
import Link from "next/link";

export default async function PublicResourcesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-red-600">
          Public Resources
        </h2>
        <p>
          Our Public Resources page has been compiled to help you find online
          resources for some of the legal questions you may have.
        </p>
        <Separator className="my-8" />
        <Disclaimer />
        <Separator className="my-8" />
        <h3 className="text-2xl font-bold mb-2 text-red-600">
          Looking for a Lost Will?
        </h3>
        <p className="mb-1">
          Visit our{" "}
          <Link
            href="/public-resources/lost-wills"
            className="text-blue-600 hover:underline"
          >
            Lost Wills
          </Link>{" "}
          page to see if your retired attorney is listed.
        </p>
        <Separator className="my-8" />
        <h3 className="text-2xl font-bold mb-2 text-red-600">Useful Links</h3>
        <div className="flex flex-col gap-2">
          <a
            href="https://www.annualcreditreport.com/index.action"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Annual Credit Report.com - Free
          </a>
          <a
            href="http://www.nycourts.gov/attorneys/clientattorneyrel.shtml"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Attorney Client Relationship (from the NYS Court System)
          </a>
          <a
            href="http://www.nywb.uscourts.gov/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bankruptcy Court, U.S., Western District of NY
          </a>
          <a
            href="http://www.courts.state.ny.us/attorneys/nybarassociations.shtml"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bar Association Listings in NYS
          </a>
          <a
            href="http://www.benefitscheckup.org/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Benefits Check Up from the National Council on Aging
          </a>
          <a
            href="http://www.reentry.net/ny/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Civil Consequences of a Criminal Record
          </a>
          <a
            href="http://www.ftc.gov/bcp/consumer.shtm"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consumer Protection Information from the Federal Trade Commission
          </a>
          <a
            href="http://www.cceontario.org/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cornell Cooperative Extension
          </a>
          <a
            href="http://www.nycourts.gov/courtinterpreter/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Court Interpreting Services NYS
          </a>
          <a
            href="http://www.dictionaryproject.org/home"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dictionary Project - Sponsored by OCBA
          </a>
          <a
            href="http://dmv.ny.gov/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DMV - Dept. of Motor Vehicles NYS
          </a>
          <a
            href="http://www.ocfs.state.ny.us/main/fostercare/fosterfaq.asp"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Foster Parent Info - NYS
          </a>
          <a
            href="http://www.nycourts.gov/ip/parent-ed/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Helping Children cope with Divorce or Separation
          </a>
          <a
            href="http://portal.hud.gov/hudportal/HUD?src=/topics/avoiding_foreclosure"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home Foreclosure Info from HUD
          </a>
          <a
            href="http://www.thehousingcouncil.org/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Housing Council - Tenant, Landlord & Homeowners
          </a>
          <a
            href="http://www.nysba.org/lawyerreferral/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lawyer Referral Service - New York State Bar Association
          </a>
          <a
            href="http://translation2.paralink.com/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Language Translator Online
          </a>
          <a
            href="http://www.lawhelpny.org/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lawhelp.org - Helping New Yorkers solve legal problems
          </a>
          <a
            href="http://lawny.org/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Legal Assistance of Western New York
          </a>
          <a
            href="http://www.cdsadr.org/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mediation - Center for Dispute Settlement
          </a>
          <a
            href="http://assembly.state.ny.us/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            New York Laws and your Representatives (from the NY Assembly)
          </a>
          <a
            href="http://iapps.courts.state.ny.us/attorney/AttorneySearch"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NYS Directory of Registered Attorneys
          </a>
          <a
            href="http://www.tax.ny.gov/pit/property/default.htm"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NYS Real Property Tax Payer Rights
          </a>
          <a
            href="https://www.childsupport.ny.gov/dcse/home.html"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NY OTDA Office of Child Support Services
          </a>
          <a
            href="http://www.criminaljustice.ny.gov/SomsSUBDirectory/search_index.jsp"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            NY Sex Offender Registry
          </a>
          <a
            href="http://www.opdv.ny.gov/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Office for the Prevention of Domestic Violence
          </a>
          <a
            href="http://www.pdffiller.com/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF Filler - Allows you to sign PDF forms online
          </a>
          <a
            href="http://portal.hud.gov/hudportal/HUD?src=/topics/rental_assistance"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Public Housing and Subsidies from HUD
          </a>
          <a
            href="http://www.tax.ny.gov/pit/property/default.htm"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Real Property Tax Payer Rights - NYS
          </a>
          <a
            href="http://www.ssa.gov/pubs"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Social Security Benefits Information
          </a>
          <a
            href="http://www.justice.gov/usao/nyw/index.html"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            U.S. Attorney&apos;s Office, Western District of NY
          </a>
          <a
            href="https://www.vinelink.com/vinelink/initMap.do"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            VINE Victim Notification Service
          </a>
          <a
            href="http://www.health.ny.gov/vital_records/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vital Records - NYS
          </a>
        </div>
      </section>
    </main>
  );
}
