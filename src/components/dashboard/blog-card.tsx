import { Blog } from "@/utils/interfaces";

export default function BlogCard({blog}:{blog:Blog}){
    return(
        <div className=" grid grid-cols-1 w-full sm:w-min min-w-[300px] max-w-[400px] bg-dimwhite/80 text-black">
            <div className=" h-4 truncate">{blog.title}</div>
            <p className=" h-10 truncate">{blog.introduction}</p>
            <p>{blog.points.length}</p>
            <p className=" self-end">{new Date(blog.created_at).toDateString()}</p>
        </div>
    )
}