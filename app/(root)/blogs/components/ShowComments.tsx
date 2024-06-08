
type TCommentsProps = {
    comments: any[];
    authorId: string;
    newId: string;
}
const ShowComments = ({
    comments,
    authorId,
    newId,
}: TCommentsProps) => {

    console.log(comments,authorId,newId)
    return (
        <div>ShowComments</div>
    )
}

export default ShowComments

