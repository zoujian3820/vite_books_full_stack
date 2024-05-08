import Reply from '../decormodel/reply'

type ReplyRawKeys = 'evalid' | 'replycontent' | 'strReplyDate' | 'replyor'
export type ReplyRaw = Pick<Reply, ReplyRawKeys>
