class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.string :location
      t.datetime :start_time
      t.datetime :end_time
      # t.references :interest, null: false, foreign_key: true
      t.float :latitude
      t.float :longitude
      t.timestamps
    end
  end
end
