import Link from "next/link";

interface DisclaimerProps {
  showMemberDirectory?: boolean;
}

export default function Disclaimer({
  showMemberDirectory = true,
}: DisclaimerProps) {
  return (
    <>
      <p className="mb-4">
        <strong>
          The Wayne County Bar Association does not engage in lawyer referral
          services.
        </strong>{" "}
        However, we maintain a directory of members, noting the types of cases
        that each attorney handles, to assist you in choosing an attorney. Click
        on a practice area for a list of attorneys who handle this type of case.
        Please note that not all of our members are attorneys: affiliate members
        may include support staff, paralegals, court clerks or business members.
        The information below is updated by our members, as a public service.
      </p>
      <p className="mb-4">
        <strong>
          PLEASE DO NOT CONTACT THE WAYNE COUNTY BAR ASSOCIATION SEEKING A
          REFERRAL FOR A LAWYER.
        </strong>{" "}
        You may contact the{" "}
        <Link
          href="https://nysba.intouchondemand.com/findlawyer/search"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          New York State Bar Association Lawyer Referral Service
        </Link>{" "}
        at (800) 342-3661 or{" "}
        <a href="mailto:LR@nysba.org" className="text-blue-600 hover:underline">
          LR@nysba.org
        </a>
      </p>
      {showMemberDirectory && (
        <p className="mb-4">
          Our directory of Wayne County Bar Association members is made public
          to assist you in finding contact information for our members and the
          types of cases that each attorney handles.{" "}
          <Link href="/members" className="text-blue-600 hover:underline">
            View our member directory
          </Link>
          .
        </p>
      )}
    </>
  );
}
