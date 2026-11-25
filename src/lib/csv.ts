import { ILead } from '@/models/Lead';

export function leadsToCSV(leads: ILead[]): string {
  const headers = [
    'Date',
    'Name',
    'Phone',
    'Email',
    'Interested In',
    'Project',
    'Status',
    'Source',
    'Notes',
    'Follow Up Date',
    'Message',
  ];

  const escapeCell = (val: any): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((lead) => {
    return [
      lead.createdAt ? new Date(lead.createdAt).toISOString().split('T')[0] : '',
      lead.name,
      lead.phone,
      lead.email,
      lead.interestedIn || '',
      lead.projectName || '',
      lead.status,
      lead.source || '',
      lead.notes || '',
      lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : '',
      lead.message || '',
    ]
      .map(escapeCell)
      .join(',');
  });

  return [headers.map(escapeCell).join(','), ...rows].join('\r\n');
}
