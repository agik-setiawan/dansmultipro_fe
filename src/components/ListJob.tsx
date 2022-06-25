import { Divider } from "@mui/material";
import Link from "next/link";
import JobModel from "../model/JobModel";

export default function ListJob({ title, location, type, company, id }: JobModel) {
    return (
        <Link href={`/jobs/${id}`}>
            <div className="hover:cursor-pointer hover:bg-gray-200 rounded px-1">
                <div className="flex justify-between items-center my-3">
                    <div>
                        <h2 className="text-sky-700"><b>{title}</b></h2>
                        <p className="text-sm"><span className="text-gray-500">{company}</span> - <span className="text-green-600"><b>{type}</b></span></p>
                    </div>
                    <div className="text-sm text-right">
                        <p className="text-gray-600">{location}</p>
                        <p className="text-gray-400">1 day ago</p>
                    </div>
                </div>
                <Divider />
            </div>
        </Link>
    )
}