import React from 'react'

const colors = [
  { name: '--background', value: 'var(--background)' },
  { name: '--foreground', value: 'var(--foreground)' },
  { name: '--card', value: 'var(--card)' },
  { name: '--card-foreground', value: 'var(--card-foreground)' },
  { name: '--popover', value: 'var(--popover)' },
  { name: '--popover-foreground', value: 'var(--popover-foreground)' },
  { name: '--primary', value: 'var(--primary)' },
  { name: '--primary-foreground', value: 'var(--primary-foreground)' },
  { name: '--secondary', value: 'var(--secondary)' },
  { name: '--secondary-foreground', value: 'var(--secondary-foreground)' },
  { name: '--tertiary', value: 'var(--tertiary)' },
  { name: '--tertiary-foreground', value: 'var(--tertiary-foreground)' },
  { name: '--quaternary', value: 'var(--quaternary)' },
  { name: '--quaternary-foreground', value: 'var(--quaternary-foreground)' },
  { name: '--muted', value: 'var(--muted)' },
  { name: '--muted-foreground', value: 'var(--muted-foreground)' },
  { name: '--accent', value: 'var(--accent)' },
  { name: '--accent-foreground', value: 'var(--accent-foreground)' },
  { name: '--destructive', value: 'var(--destructive)' },
  { name: '--destructive-foreground', value: 'var(--destructive-foreground)' },
  { name: '--border', value: 'var(--border)' },
  { name: '--input', value: 'var(--input)' },
  { name: '--ring', value: 'var(--ring)' },
  { name: '--radius', value: 'var(--radius)' },
];

const Projects = () => {
  return (
    <div className="p-4">
      <h1 className="text-primary mb-4">Color Palette</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="p-4 rounded-lg shadow-md" style={{ backgroundColor: `hsl(${color.value})` }}>
            <p className="text-sm font-medium" style={{ color: `hsl(var(--foreground))` }}>{color.name}</p>
            <p className="text-xs" style={{ color: `hsl(var(--foreground))` }}>{color.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects